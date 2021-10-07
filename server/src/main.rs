use lazy_regex::regex;
use std::fs::{self, DirEntry};
use std::io;
use std::path::Path;
use std::include_str;
use warp::Filter;

#[tokio::main]
async fn main() {
    let with_control_origin = warp::reply::with::header("Access-Control-Allow-Origin", "*");

    let home = warp::any().and(warp::fs::dir("./dist/"));

    let blog_home = warp::path!("blog").map(|| {
        let mut agg: Vec<String> = vec![];
        visit_dirs(Path::new("./articles"), &mut agg);
        warp::reply::json(
            &agg
        )
    });

    let blog_page = warp::path!("blog" / String).map(|name| {
        println!("{}", name);
        let body = markdown_to_html::markdown(
            &fs::read_to_string(format!("./articles/{}", name)).expect("File not found!"),
        );
        warp::reply::html(body)
    });

    let routes = home.or(blog_home.or(blog_page).with(with_control_origin)).or(warp::any().and(warp::fs::file("./dist/index.html")));

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
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
