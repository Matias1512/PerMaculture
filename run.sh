docker run --rm --user "$(id -u)":"$(id -g)" -v "$PWD":/usr/src/lorelink_api -w /usr/src/lorelink_api rust:1.69 cargo build --release
