use crate::{is_markdown, is_file_there, is_dir_there, with_directory, with_template};
use warp::{filters::BoxedFilter, reject, Filter, Rejection};
// 1. "hello"
fn path_prefix() -> BoxedFilter<()> {
    warp::path("hello").boxed()
}

pub fn hello() -> BoxedFilter<(u64,)> {
    warp::get() // 3.
        .and(path_prefix()) // 4.
        .and(warp::path::param::<u64>()) // 5.
        .boxed()
}

pub fn dir(dir: String, template: String) -> BoxedFilter<(String, String)> {
    warp::get() // 3.
        .and(warp::path(dir.clone())) // 4.
        .and(warp::path::end()) // 4.
        .and(with_directory(dir)) // 5.
        .and_then(is_dir_there)
        .and(with_template(template))
        .boxed()
}

pub fn markdown(dir: String, template: String) -> BoxedFilter<(String, String, String)> {
    warp::get() // 3.
        .and(warp::path(dir.clone())) // 4.
        .and(warp::path::param::<String>()) // 5.
        .and(warp::path::end())
        .and_then(is_markdown)
        .and(with_directory(dir)) // 5.
        .and_then(is_file_there)
        .untuple_one()
        .and(with_template(template))
        .boxed()
}
