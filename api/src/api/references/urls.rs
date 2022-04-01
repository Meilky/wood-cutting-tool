use actix_web::{web::Json, HttpRequest, Result};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct Reference {
    id: u32,
    name: String,
    description: String,
}

pub fn get_references(req: HttpRequest) -> Result<Json<Vec<Reference>>> {
    let refs = vec![Reference {
        id: 1,
        name: "all".to_string(),
        description: "akfdjas".to_string(),
    }];

    Ok(Json(refs))
}
