pub mod plants;
pub mod bugs;
pub mod interactions;
pub mod keepers; 

#[derive(serde::Serialize)]
pub struct Response {
    pub message: String,
    pub id: i32,
}

#[derive(serde::Serialize)]
pub struct LoginResponse {
    pub message: String,
    pub token: String,
}
