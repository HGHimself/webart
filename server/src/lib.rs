pub mod api;
pub mod handlers;
pub mod routes;
pub mod services;

use warp::{Filter};
use std::path::Path;

pub fn with_directory(dir: String) -> warp::filters::BoxedFilter<(String,)> {
    warp::any().map(move || dir.clone()).boxed()
}

pub fn with_template(template: String) -> warp::filters::BoxedFilter<(String,)> {
    warp::any().map(move || template.clone()).boxed()
}

pub async fn is_markdown(file: String) -> Result<String, warp::Rejection> {
    log::info!("is_markdown running");
    let length = file.len();
    if length > 3 && ".md" == &file[length - 3..length] {
        Ok(file)
    } else {
        log::info!("not markdown");
        Err(warp::reject::reject())
    }
}

pub async fn is_file_there(file: String, dir: String) -> Result<(String, String), warp::Rejection> {
    log::info!("is_file_there running");
    let path = format!("{}/{}", dir, file);
    if Path::new(&path).exists() {
        Ok((file, dir))
    } else {
        log::info!("file not there");
        Err(warp::reject::reject())
    }
}

pub async fn is_dir_there(dir: String) -> Result<String, warp::Rejection> {
    log::info!("is_dir_there running");
    if Path::new(&dir).exists() {
        Ok(dir)
    } else {
        log::info!("dir not there");
        Err(warp::reject::reject())
    }
}