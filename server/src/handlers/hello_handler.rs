use crate::services::hello_service;
use log::info;
use std::{fs, path::Path, convert::Infallible};
use warp;
use warp::{reject,filters::body::BodyDeserializeError, Filter, Rejection, Reply, http::StatusCode};

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

pub async fn reject_bad_file(_: String) -> Result<impl Reply, warp::Rejection> {
    log::info!("reject_bad_file running");
    let mut template = String::new();
    hello_service::read_file("./templates/server-error.html", &mut template).unwrap();
    let body = template.replace("{{error}}", "404 NOT_FOUND");

    let html = warp::reply::html(body);

    Ok(warp::reply::with_status(html, StatusCode::NOT_FOUND))
}

// This function receives a `Rejection` and tries to return a custom
// value, otherwise simply passes the rejection along.
pub async fn handle_rejection(err: Rejection) -> Result<impl Reply, Infallible> {
    let code;
    let message;

    if err.is_not_found() {
        code = StatusCode::NOT_FOUND;
        message = String::from("404 NOT_FOUND");
    } else if let Some(_) = err.find::<BodyDeserializeError>() {
        code = StatusCode::BAD_REQUEST;
        message = String::from("400 BAD_REQUEST");
    } else if let Some(_) = err.find::<warp::reject::MethodNotAllowed>() {
        code = StatusCode::METHOD_NOT_ALLOWED;
        message = String::from("405 METHOD_NOT_ALLOWED");
    } else {
        code = StatusCode::INTERNAL_SERVER_ERROR;
        message = String::from("500 INTERNAL_SERVER_ERROR");
    }
    let mut template = String::new();
    hello_service::read_file("./templates/server-error.html", &mut template).unwrap();
    let body = template.replace("{{error}}", &message);

    let html = warp::reply::html(body);

    Ok(warp::reply::with_status(html, code))
}
