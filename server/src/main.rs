use dotenv::dotenv;
use env_logger::Env;
use log::info;
use serde_derive::{Deserialize, Serialize};
use server::{handlers::hello_handler, routes::hello_route};
use std::{env, net::SocketAddr};
use warp::Filter;

pub mod api;

#[tokio::main]
async fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    dotenv().ok();
    info!("Booting server!");

    let app_host = env::var("HOST").expect("HOST must be set");
    let app_port = env::var("PORT").expect("PORT must be set");
    let app_addr = format!("{}:{}", app_host, app_port);

    let public_folder = env::var("PUBLIC_DIR").expect("PUBLIC_DIR must be set");

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

    let home = warp::any().and(warp::fs::dir(public_folder.clone()));

    let end = hello!(
        String::from("articles"),
        String::from("./templates/articles.html"),
        String::from("./templates/article-template.html")
    )
    .or(hello!(
        String::from("recipes"),
        String::from("./templates/recipes.html"),
        String::from("./templates/recipe-template.html")
    ))
    .or(home)
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
