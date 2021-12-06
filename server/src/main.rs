use dotenv::dotenv;
use env_logger::Env;
use lazy_regex::regex;
use log::info;
use serde_derive::{Deserialize, Serialize};
use std::{
    env,
    fs::{self, DirEntry, File},
    io::{self, Write},
    net::SocketAddr,
    path::Path,
};
use warp::Filter;

#[derive(Deserialize, Serialize)]
struct Dada {
    message: String,
}

#[derive(Deserialize, Serialize)]
struct Svg {
    x: i32,
    y: i32,
    period: i32,
    count: i32,
    spectrum: i32,
    svg: String,
}

#[tokio::main]
async fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    dotenv().ok();
    info!("Booting server!");

    let app_host = env::var("HOST").expect("HOST must be set");
    let app_port = env::var("PORT").expect("PORT must be set");
    let app_addr = format!("{}:{}", app_host, app_port);

    let public_folder = env::var("PUBLIC_DIR").expect("PUBLIC_DIR must be set");
    let article_folder = env::var("ARTICLE_DIR").expect("ARTICLE_DIR must be set");
    let article_folder_clone = article_folder.clone();
    // prepare tls if necessary
    let tls = env::var("ENABLE_TLS")
        .expect("ENABLE_TLS must be set")
        .parse()
        .expect("ENABLE_TLS must be true or false");

    let cert_path;
    let key_path;
    if tls {
        cert_path = Some(env::var("CERT_PATH").expect("CERT_PATH must be set"));
        key_path = Some(env::var("KEY_PATH").expect("KEY_PATH must be set"));
    } else {
        cert_path = None;
        key_path = None;
    }

    let with_control_origin = warp::reply::with::header("Access-Control-Allow-Origin", "*");
    let with_content_allow =
        warp::reply::with::header("Access-Control-Allow-Headers", "Content-Type");

    let home = warp::any().and(warp::fs::dir(public_folder.clone()));

    let blog_home = warp::path!("blog").map(move || {
        let mut agg: Vec<String> = vec![];
        visit_dirs(Path::new(&article_folder_clone), &mut agg);
        warp::reply::json(&agg)
    });

    let blog_page = warp::path!("blog" / String).map(move |name| {
        let body = markdown_to_html::markdown(
            &fs::read_to_string(format!("{}/{}", article_folder, name)).expect("File not found!"),
        );
        warp::reply::html(body)
    });

    let dada = warp::options()
        .and(warp::path!("svg"))
        .map(|| warp::reply())
        .or(warp::post()
            .and(warp::path!("svg"))
            .and(warp::body::content_length_limit(1024 * 256))
            .and(warp::body::json())
            .map(|svg: Svg| {
                let s = format!(
                    "./svgs/{}_{}_{}_{}_{}.svg",
                    svg.x, svg.y, svg.period, svg.count, svg.spectrum
                );
                let mut file = File::create(s.clone()).unwrap();
                println!("{}", s);
                write!(file, "{}", svg.svg).unwrap();
                warp::reply::html(s)
            }))
        .with(with_content_allow);
    //
    // let dada = warp::options()
    //     .and(warp::path!("dada"))
    //     .map(|| warp::reply())
    //     .or(warp::post()
    //         .and(warp::path!("dada"))
    //         .and(warp::body::content_length_limit(1024 * 16))
    //         .and(warp::body::json())
    //         .map(|dada: Dada| {
    //             let res = dada_poem_generator::dada(&dada.message);
    //             warp::reply::html(res)
    //         }))
    //     .with(with_content_allow);

    let end = home
        .or(dada.or(blog_home.or(blog_page)).with(with_control_origin))
        .or(warp::any().and(warp::fs::file(format!("{}/index.html", public_folder))))
        .with(warp::log("webart"));

    let socket_address = app_addr
        .parse::<SocketAddr>()
        .expect("Could not parse Addr");

    info!("Listening at {}", app_addr);

    if tls {
        info!("🔐 TLS Enabled!");

        // serve over tls if config says so
        warp::serve(end)
            .tls()
            .cert_path(cert_path.unwrap())
            .key_path(key_path.unwrap())
            .run(socket_address)
            .await;
    } else {
        // otherwise serve normally
        warp::serve(end).run(socket_address).await;
    }
}

fn spit_out_file_name(file: &DirEntry) -> String {
    let re = regex!("^./[^/]*/");
    re.replace(&file.path().to_str().unwrap(), "").to_string()
}

fn visit_dirs(dir: &Path, agg: &mut Vec<String>) -> io::Result<()> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                visit_dirs(&path, agg)?;
            } else {
                agg.push(spit_out_file_name(&entry));
            }
        }
    }
    Ok(())
}
