pub mod api;
pub mod handlers;
pub mod routes;
pub mod services;

use warp::Filter;

pub fn with_directory(dir: String) -> warp::filters::BoxedFilter<(String,)> {
    warp::any().map(move || dir.clone()).boxed()
}

pub fn with_template(template: String) -> warp::filters::BoxedFilter<(String,)> {
    warp::any().map(move || template.clone()).boxed()
}

pub async fn is_markdown(file: String) -> Result<String, warp::Rejection> {
    let length = file.len();
    if ".md" == &file[length - 3..length] {
        Ok(file)
    } else {
        Err(warp::reject::reject())
    }
}
