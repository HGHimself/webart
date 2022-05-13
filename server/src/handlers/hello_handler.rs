use crate::services::hello_service;
use log::info;
use std::{fs, path::Path};
use warp;
use warp::{reject, Filter, Rejection, Reply};

pub async fn hello(name: u64) -> Result<impl Reply, Rejection> {
    let reply = format!("Hello, {}!", name);
    println!("{}", &reply);
    Ok(warp::reply::html(reply))
}

pub async fn handle_dir(dir: String, template_path: String) -> Result<impl Reply, Rejection> {
    let mut agg: Vec<String> = vec![];
    hello_service::visit_dirs(Path::new(&dir), &mut agg);
    let body = agg
        .iter()
        .map(|link| format!("<a href=\"/{}\">{}</a><br>", link, link))
        .collect::<Vec<String>>()
        .join("");

    let mut template = String::new();
    hello_service::read_file(&template_path, &mut template).unwrap();
    let body = template.replace("{{body}}", &body);
    let body = body.replace("{{title}}", &dir);

    Ok(warp::reply::html(body))
}

pub async fn handle_markdown(
    file: String,
    dir: String,
    template_path: String,
) -> Result<impl Reply, Rejection> {
    let path = format!("{}/{}", dir, file);
    info!("markdown rendering {}", path);
    let body = markdown_to_html::markdown(&fs::read_to_string(path).expect("File not found!"));

    let mut template = String::new();
    hello_service::read_file(&template_path, &mut template).unwrap();
    let body = template.replace("{{body}}", &body);
    let body = body.replace("{{title}}", &dir);

    Ok(warp::reply::html(body))
}
