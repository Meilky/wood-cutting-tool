use crate::{db::DBPool, middlewares::auth_middleware::AuthMiddleware};
use actix_web::{
    http::{header::ContentType, StatusCode},
    web::{Data, Json},
    HttpRequest, HttpResponse,
};
use serde::{Deserialize, Serialize};

use super::models::{Plank, Project};

#[derive(Serialize, Deserialize)]
pub struct Info {
    fingerprint: String,
}

pub async fn get_projects(req: HttpRequest, info: Json<Info>) -> HttpResponse {
    let pool = req.app_data::<Data<DBPool>>().unwrap();
    let auth_mid = req.app_data::<Data<AuthMiddleware>>().unwrap();

    let token_data = match auth_mid
        .get_ref()
        .check(req.cookie("token"), &info.fingerprint)
    {
        Ok(t) => t,
        Err(e) => {
            return HttpResponse::build(StatusCode::BAD_REQUEST)
                .content_type(ContentType::plaintext())
                .body(e);
        }
    };

    let data = sqlx::query("SELECT * FROM `projects` WHERE user_id=?;")
        .bind(token_data.user_id)
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    let mut projects: Vec<Project> = vec![];

    for project in data {
        projects.push(Project::from_row(project));
    }

    HttpResponse::build(StatusCode::OK).body(serde_json::to_string(&projects).unwrap())
}

#[derive(Serialize, Deserialize)]
pub struct PlanksInfo {
    fingerprint: String,
    project_id: u32,
}

pub async fn get_planks(req: HttpRequest, info: Json<PlanksInfo>) -> HttpResponse {
    let pool = req.app_data::<Data<DBPool>>().unwrap();
    let auth_mid = req.app_data::<Data<AuthMiddleware>>().unwrap();

    match auth_mid
        .get_ref()
        .check(req.cookie("token"), &info.fingerprint)
    {
        Ok(t) => t,
        Err(e) => {
            return HttpResponse::build(StatusCode::BAD_REQUEST)
                .content_type(ContentType::plaintext())
                .body(e);
        }
    };

    let data = sqlx::query("SELECT * FROM `planks` WHERE project_id=?;")
        .bind(info.project_id)
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    let mut planks: Vec<Plank> = vec![];

    for plank in data {
        planks.push(Plank::from_row(plank));
    }

    HttpResponse::build(StatusCode::OK).body(serde_json::to_string(&planks).unwrap())
}
