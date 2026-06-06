import { serve } from "@criteria/adapter-sdk";
import { adapterConfig } from "./src/adapter.js";

// serve() handles the go-plugin handshake, the v2 RPCs, and --emit-manifest
// (which writes adapter.yaml for the publish pipeline). To run this adapter
// remotely (phone-home) instead, swap serve() for serveRemote() — see
// examples/remote/ and the SDK README.
serve(adapterConfig);
