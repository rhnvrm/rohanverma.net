+++
title = "stock-market-circulars"
description = "Living dataset of NSE, BSE, SEBI circulars with AI summaries"
weight = 6

[extra]
github_url = "https://github.com/rhnvrm/stock-market-circulars"
demo_url = "https://rhnvrm.github.io/stock-market-circulars/"
+++

A living dataset of regulatory circulars from NSE, BSE, and SEBI, continuously updated through automated RSS feed processing and LLM-powered content extraction.

## Data Sources

- **NSE** - Trading circulars, market updates, regulatory changes
- **BSE** - Listing requirements, compliance notices, market rules
- **SEBI** - Policy changes, investor guidelines, regulatory frameworks

## How It Works

The dataset updates automatically every 3 hours via GitHub Actions:

1. RSS feeds are monitored for new circulars
2. PDFs are downloaded and text extracted
3. Claude AI analyzes and categorizes content
4. Structured markdown files are generated
5. Hugo rebuilds the static site
6. Deployed to GitHub Pages

Each circular includes source, date, impact level, affected stocks, and AI-generated categorization.

## Use Cases

- Track regulatory changes affecting your portfolio
- Research compliance requirements
- Monitor market rule updates
- Historical circular analysis
