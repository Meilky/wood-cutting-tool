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
            name: "Hello Claude".to_string(),
            description: "The long description of claude".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
        },
        Module {
            id: 1,
            name: "Test Module 1".to_string(),
            description: "The long description of the test module 1".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
        },
        Module {
            id: 2,
            name: "Test Module 2".to_string(),
            description: "The long description of the test module 2".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
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
            name: "Hello Claude".to_string(),
            description: "The long description of claude".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
        },
        Module {
            id: 1,
            name: "Test Module 1".to_string(),
            description: "The long description of the test module 1".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
        },
        Module {
            id: 2,
            name: "Test Module 2".to_string(),
            description: "The long description of the test module 2".to_string(),
            origin: "/modules/hello-world/index.js".to_string(),
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
