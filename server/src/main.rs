use dotenv::dotenv;
use env_logger::Env;
use lazy_regex::regex;
use log::info;
use serde_derive::{Deserialize, Serialize};
use server::{handlers::hello_handler, hello, routes::hello_route};
use std::{
    env,
    fs::{self, DirEntry},
    io::{self},
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
    let recipe_folder = env::var("RECIPE_DIR").expect("RECIPE_DIR must be set");

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

    let home = warp::get().and(warp::fs::dir(public_folder.clone()));
    let articles = hello!(
        String::from("articles"),
        String::from("./templates/articles.html"),
        String::from("./templates/article-template.html")
    );
    let recipes = hello!(
        String::from("recipes"),
        String::from("./templates/recipes.html"),
        String::from("./templates/recipe-template.html")
    );
    let end = articles
        .or(recipes)
        .or(home)
        .or(warp::get().and(warp::path::end()).and(warp::fs::file(format!("{}/index.html", public_folder))))
        .recover(hello_handler::handle_rejection)
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
