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
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            zola
            git
            nodejs_20
            yarn
            just
          ];

          shellHook = ''
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
      });
}