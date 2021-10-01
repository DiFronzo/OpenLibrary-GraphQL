FROM denoland/deno:latest

# The port that your application listens to.
EXPOSE 8080

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
RUN deno cache https://raw.githubusercontent.com/DiFronzo/OpenLibrary-GraphQL/main/deps.ts

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache https://raw.githubusercontent.com/DiFronzo/OpenLibrary-GraphQL/main/mod.ts

CMD ["run", "--allow-net", "https://raw.githubusercontent.com/DiFronzo/OpenLibrary-GraphQL/main/mod.ts"]
