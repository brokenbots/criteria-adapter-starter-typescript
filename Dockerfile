# Optional: opt into publishing a runnable container image (D12).
#
# By default this starter publishes an artifact-only OCI package (the single
# compiled binary) and does NOT build an image. Pure-binary adapters do not
# need an image. Uncomment this file and set `with_image: "true"` in
# .github/workflows/publish.yml only if your adapter needs a runnable image
# (e.g. to run standalone in Kubernetes/ECS as a remote phone-home adapter).
#
# FROM gcr.io/distroless/base-debian12
# COPY out/adapter-linux-amd64 /usr/local/bin/adapter
# # The image entrypoint typically calls the adapter in remote mode; pass the
# # CRITERIA_REMOTE_* env vars at runtime (see examples/remote/).
# ENTRYPOINT ["/usr/local/bin/adapter"]
