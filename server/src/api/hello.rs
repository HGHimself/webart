#[macro_export]
macro_rules! hello {
    ($dir:expr, $dir_template:expr, $page_template:expr) => {
        hello_route::markdown($dir, $page_template)
            .and_then(hello_handler::handle_markdown)
            .or(hello_route::dir($dir, $dir_template).and_then(hello_handler::handle_dir))
    };
}

/*




.or(hello_route::markdown(
    String::from("articles"),
    String::from("ABCDEFGHIJKLMNOP"),
)
.and_then(hello_handler::handle_markdown(
    String::from("articles"),
    String::from("ABCDEFGHIJKLMNOP"),
)))
*/
