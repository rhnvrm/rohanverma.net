{
  description = "Development environment for rohanverma.net website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    doordarshan = {
      url = "github:oddship/doordarshan-zola/32c50086e65970586bd9df0df24d9c93372a51a1";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, doordarshan }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        socialPython = pkgs.python3.withPackages (ps: [ ps.pillow ]);
      in
      {
        packages.default = pkgs.stdenv.mkDerivation {
          pname = "rohanverma-site";
          version = "1.0.0";
          src = ./.;
          nativeBuildInputs = [ pkgs.zola socialPython ];
          SOCIAL_CARD_FONT_DIR = "${pkgs.dejavu_fonts}/share/fonts/truetype";
          buildPhase = ''
            rm -rf themes/doordarshan
            mkdir -p themes
            cp -R ${doordarshan} themes/doordarshan
            chmod -R u+w themes/doordarshan
            bash scripts/build-site.sh
          '';
          installPhase = ''
            cp -r public $out
          '';
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            zola
            socialPython
            git
            nodejs_20
            yarn
            just
            playwright-driver
          ];

          shellHook = ''
            export SOCIAL_CARD_FONT_DIR="${pkgs.dejavu_fonts}/share/fonts/truetype"
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
