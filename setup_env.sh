#!/bin/bash
set -e

echo "Node version:"
node -v
npm -v

echo "Installing project dependencies"
npm ci

echo "Installing Allure"
npm install -D allure-playwright
npm install -g allure-commandline --force

echo "Installing Playwright browsers (chromium + firefox)"
npx playwright install chromium firefox
