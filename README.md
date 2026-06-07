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
| [`.github/workflows/publish.yml`](.github/workflows/publish.yml) | Tag → build → keyless-sign → push (GitHub Actions) |
| [`.gitlab-ci.yml.example`](.gitlab-ci.yml.example) | Same flow for GitLab CI (copy to `.gitlab-ci.yml`) |
| [`Makefile`](Makefile) | `make build` / `make publish` — registry-agnostic local path |
| [`Dockerfile`](Dockerfile) | Commented; uncomment to also publish a runnable image |
| [`examples/remote/`](examples/remote/) | k8s / docker-compose / systemd manifests for remote (phone-home) mode |

## Publishing

Three equivalent paths produce the same signed OCI artifact:

- **GitHub Actions** — push a `v*` tag; [`publish.yml`](.github/workflows/publish.yml)
  builds, **keyless-signs** (Sigstore, via the job's OIDC identity), and pushes.
- **GitLab CI** — copy [`.gitlab-ci.yml.example`](.gitlab-ci.yml.example) to
  `.gitlab-ci.yml`; it does the same, signing keyless via GitLab's `id_tokens`.
- **Local / other CI** — `make publish REGISTRY=ghcr.io/you/your-adapter:0.1.0`.
  Requires the [`criteria`](https://github.com/brokenbots/criteria) CLI on PATH.
  Publishes unsigned by default; set `SIGN_KEY=/path/to/cosign.key` for
  explicit-key signing (interactive keyless is a CI-only path).

To also ship a runnable container image (for `environment.runtime = "docker"`),
build and push it from your own CI (its `Dockerfile`), then record it: add
`image: ghcr.io/you/your-adapter:0.1.0-image` to the action, or
`criteria adapter publish … --image <ref>` locally.

## Running remotely

To run the adapter remotely instead of letting the host launch it, swap
`serve(adapterConfig)` for `serveRemote(adapterConfig, opts)` in `index.ts` and
deploy with one of the manifests in [`examples/remote/`](examples/remote/). See
the [SDK README](https://github.com/brokenbots/criteria-typescript-adapter-sdk#running-as-a-remote-adapter)
for the full `serveRemote` API.

## License

MIT

## Security & dependencies

This starter ships the supply-chain baseline every Criteria adapter is expected
to carry — see [SECURITY.md](SECURITY.md) and
[docs/dependency-policy.md](docs/dependency-policy.md). CI (`ci.yml`) runs a
**blocking** osv-scanner gate (over `bun.lock`) plus a non-blocking `bun outdated`
report; `publish.yml` cross-compiles `linux/amd64`, `linux/arm64`, `darwin/arm64`
and publishes one multi-platform signed OCI artifact.

```bash
bun run vuln-scan      # osv-scanner — known-vulnerability gate (WS49)
bun run deps:outdated  # bun outdated — freshness report (WS50)
```

> The SDK is installed from its GitHub repo (`github:brokenbots/criteria-typescript-adapter-sdk`)
> via a `prepare` build, and is listed in `trustedDependencies` so bun runs that
> build. Switch to an npm version once the SDK is published.
