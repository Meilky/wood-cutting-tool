use actix_web::{
    web::{Json, Path},
    ResponseError,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Reference {
    id: u32,
    name: String,
    description: String,
    link: String,
}

pub async fn get_references() -> Json<Vec<Reference>> {
    let references = vec![
        Reference {
            id: 0,
            name: "Canvas 2d rendering context".to_string(),
            description: "Utilisé pour les références du context 2d des canvas javascript pour faire aparaitre les coupures.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D".to_string()
        },
        Reference {
            id: 1,
            name: "React lifecycle".to_string(),
            description: "Utilisé pour baser le cycle de vie de mes \"custom component\" sur ceux de React.".to_string(),
            link: "https://www.w3schools.com/react/react_lifecycle.asp".to_string()
        },
        Reference {
            id: 2,
            name: "Html element".to_string(),
            description: "Utilisé pour les références au élément html.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement".to_string()
        },
        Reference {
            id: 3,
            name: "Css flex box".to_string(),
            description: "Utilisé pour la nav bar, la page des références et la page d'accueil.".to_string(),
            link: "https://www.w3schools.com/css/css3_flexbox_container.asp".to_string()
        },
        Reference {
            id: 4,
            name: "Html form event".to_string(),
            description: "Utilisé pour que la page ne \"reload\" pas lorsque nous cliquons sur le boutton soumettre dans la page d'accueil.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event".to_string()
        },
        Reference {
            id: 5,
            name: "Github repo".to_string(),
            description: "Lien à la \"repo\" Github.".to_string(),
            link: "https://github.com/Meilky/wood-cutting-tool".to_string()
        },
        Reference {
            id: 6,
            name: "Project hiearchy".to_string(),
            description: "Utilisé pour sructuré tout la structure de fichier de l'api.".to_string(),
            link:"https://medium.com/geekculture/backend-design-actix-web-project-hierarchy-7fc229bd830c".to_string()
        },
        Reference {
            id: 7,
            name: "Rust .env".to_string(),
            description: "Librarie rust utiliser pour accédé aux variables d'environement.".to_string(),
            link: "https://github.com/dotenv-rs/dotenv".to_string()
        },
        Reference {
            id: 8,
            name: "Rust sqlx".to_string(),
            description: "Library rust utilisé pour créer la connection a la db.".to_string(),
            link: "https://github.com/launchbadge/sqlx".to_string()
        }
    ];

    Json(references)
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

pub async fn get_reference(id: Path<u32>) -> Result<Json<Reference>, MyError> {
    let references = vec![
        Reference {
            id: 0,
            name: "Canvas 2d rendering context".to_string(),
            description: "Utilisé pour les références du context 2d des canvas javascript pour faire aparaitre les coupures.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D".to_string()
        },
        Reference {
            id: 1,
            name: "React lifecycle".to_string(),
            description: "Utilisé pour baser le cycle de vie de mes \"custom component\" sur ceux de React.".to_string(),
            link: "https://www.w3schools.com/react/react_lifecycle.asp".to_string()
        },
        Reference {
            id: 2,
            name: "Html element".to_string(),
            description: "Utilisé pour les références au élément html.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement".to_string()
        },
        Reference {
            id: 3,
            name: "Css flex box".to_string(),
            description: "Utilisé pour la nav bar, la page des références et la page d'accueil.".to_string(),
            link: "https://www.w3schools.com/css/css3_flexbox_container.asp".to_string()
        },
        Reference {
            id: 4,
            name: "Html form event".to_string(),
            description: "Utilisé pour que la page ne \"reload\" pas lorsque nous cliquons sur le boutton soumettre dans la page d'accueil.".to_string(),
            link: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event".to_string()
        },
        Reference {
            id: 5,
            name: "Github repo".to_string(),
            description: "Lien à la \"repo\" Github.".to_string(),
            link: "https://github.com/Meilky/wood-cutting-tool".to_string()
        },
        Reference {
            id: 6,
            name: "Project hiearchy".to_string(),
            description: "Utilisé pour sructuré tout la structure de fichier de l'api.".to_string(),
            link:"https://medium.com/geekculture/backend-design-actix-web-project-hierarchy-7fc229bd830c".to_string()
        },
        Reference {
            id: 7,
            name: "Rust .env".to_string(),
            description: "Librarie rust utiliser pour accédé aux variables d'environement.".to_string(),
            link: "https://github.com/dotenv-rs/dotenv".to_string()
        },
        Reference {
            id: 8,
            name: "Rust sqlx".to_string(),
            description: "Library rust utilisé pour créer la connection a la db.".to_string(),
            link: "https://github.com/launchbadge/sqlx".to_string()
        }
    ];

    let real_id: u32 = id.into_inner();

    for reference in references {
        if reference.id == real_id {
            return Ok(Json(reference));
        }
    }

    Err(MyError {
        msg: "unknow id".to_string(),
    })
}
