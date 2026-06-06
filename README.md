# criteria-adapter-starter-typescript

A starter template for building a [Criteria](https://github.com/brokenbots/criteria)
adapter in TypeScript using [`@criteria/adapter-sdk`](https://github.com/brokenbots/criteria-typescript-adapter-sdk).

> **Use this template** (green button on GitHub) or
> `gh repo create my-adapter --template brokenbots/criteria-adapter-starter-typescript`.

## Quickstart

```bash
# 1. Clone your new repo, then install deps.
bun install

# 2. Edit src/adapter.ts — change the name, schemas, and execute() logic.

# 3. Build the single-binary adapter.
bun run build            # -> out/adapter

# 4. Inspect the generated manifest.
bun run emit-manifest

# 5. Publish: push a tag. The publish workflow builds, signs, and pushes an
#    OCI artifact to GHCR under your org.
git tag v0.1.0 && git push origin v0.1.0
```

The published adapter can then be pulled by a workflow:
`criteria adapter pull ghcr.io/<your-org>/<repo>:0.1.0`.

## What's in here

| Path | Purpose |
|------|---------|
| [`index.ts`](index.ts) | Entrypoint — calls `serve(adapterConfig)` |
| [`src/adapter.ts`](src/adapter.ts) | Your adapter: schemas + `execute()` |
| [`.github/workflows/publish.yml`](.github/workflows/publish.yml) | Tag → build → sign → push (artifact-only) |
| [`Dockerfile`](Dockerfile) | Commented; uncomment to also publish a runnable image |
| [`examples/remote/`](examples/remote/) | k8s / docker-compose / systemd manifests for remote (phone-home) mode |

## Running remotely

To run the adapter remotely instead of letting the host launch it, swap
`serve(adapterConfig)` for `serveRemote(adapterConfig, opts)` in `index.ts` and
deploy with one of the manifests in [`examples/remote/`](examples/remote/). See
the [SDK README](https://github.com/brokenbots/criteria-typescript-adapter-sdk#running-as-a-remote-adapter)
for the full `serveRemote` API.

## License

MIT
