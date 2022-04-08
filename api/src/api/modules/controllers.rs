use actix_web::{
    web::{Json, Path},
    ResponseError,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Module {
    id: u32,
    name: String,
    description: String,
    origin: String,
}

pub async fn get_modules() -> Json<Vec<Module>> {
    let modules = vec![
        Module {
            id: 0,
            name: "Wood Cutting Tool".to_string(),
            description: "This is a module to help you cut a log and get the best wood you want out of it.".to_string(),
            origin: "/modules/wood-cutting-tool/index.js".to_string(),
        },
        Module {
            id: 1,
            name: "References".to_string(),
            description: "This is a module to show the refrences I used during the development of the app.".to_string(),
            origin: "/modules/references/index.js".to_string(),
        },
    ];

    Json(modules)
}

#[derive(Debug)]
pub struct MyError {
    msg: String,
}

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.msg)
    }
}

impl ResponseError for MyError {}

pub async fn get_module(id: Path<u32>) -> Result<Json<Module>, MyError> {
    let modules = vec![
        Module {
            id: 0,
            name: "Wood Cutting Tool".to_string(),
            description: "This is a module to help you cut a log and get the best wood you want out of it.".to_string(),
            origin: "/modules/wood-cutting-tool/index.js".to_string(),
        },
        Module {
            id: 1,
            name: "References".to_string(),
            description: "This is a module to show the refrences I used during the development of the app.".to_string(),
            origin: "/modules/references/index.js".to_string(),
        },
    ];

    let real_id: u32 = id.into_inner();

    for module in modules {
        if module.id == real_id {
            return Ok(Json(module));
        }
    }

    Err(MyError {
        msg: "unknow id".to_string(),
    })
}
