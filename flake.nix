{
  description = "Development environment for rohanverma.net website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.stdenv.mkDerivation {
          pname = "rohanverma-site";
          version = "1.0.0";
          src = ./.;
          nativeBuildInputs = [ pkgs.zola ];
          buildPhase = ''
            zola build
          '';
          installPhase = ''
            cp -r public $out
          '';
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            zola
            git
            nodejs_20
            yarn
            just
            playwright-driver
          ];

          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true

            echo "Development environment loaded!"
            echo "Available tools:"
            echo "  - Zola: $(zola --version)"
            echo "  - Just: $(just --version)"
            echo ""
            echo "Zola commands:"
            echo "  zola serve - Start development server"
            echo "  zola build - Build site for production"
            echo "  zola init <new-site> - Create new site"
          '';
        };

        # A silent shell for MCP servers (avoids breaking JSON-RPC with stdout noise)
        devShells.mcp = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            playwright-driver
          ];

          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
          '';
        };
      });
}