use rocket::{response::Debug, fairing::{Fairing, Info}, Request, Response, http::Header};

pub mod plants;
pub mod bugs;
pub mod trees;

pub type Result<T, E = Debug<diesel::result::Error>> = std::result::Result<T, E>;

/// Catches all OPTION requests in order to get the CORS related Fairing triggered.
#[options("/<_..>")]
pub fn all_options() {}

/// Fairing to allow CORS requests.
pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Cross-Origin-Resource-Sharing Fairing",
            kind: rocket::fairing::Kind::Response,
        }
    }
    async fn on_response<'r>(&self, request: &'r Request<'_>, response: &mut Response<'r>) {
        let allowed_origins = [
            "http://localhost:4200",
            "http://localhost:4200/login",
            "http://localhost:4200/signup",
        ];

        if let Some(origin) = request.headers().get_one("Origin") {
            if allowed_origins.contains(&origin) {
                response.set_header(Header::new("Access-Control-Allow-Origin", origin));
            }
        }
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, DELETE, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "Content-Type"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}
