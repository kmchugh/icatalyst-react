<br />
<div align="center">
  <a href="https://singularity.com" target="blank">
    <img src="./public/static/images/logos/vertical-mid.png?raw=true" width="101" height="128" alt="ICatalyst Logo" />
  </a>
  
  <h3 align="center">@icatalyst/react</h3>

  <p align="center">
    MVP Library
    <br />
    <a href="https://github.com/ICatalyst-Pte-Ltd/com.icatalyst.singularity.api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://api-dev.singularity.icatalyst.com/openapi">OpenAPI Docs</a>
    ·
    <a href="https://app.singularity.icatalyst.com">View Application</a>
    ·
    <a href="https://github.com/ICatalyst-Pte-Ltd/com.icatalyst.singularity.api/issues">Report Bug</a>
    ·
    <a href="https://github.com/ICatalyst-Pte-Ltd/com.icatalyst.singularity.api/issues">Request Feature</a>
  </p>
</div>
<br />

# About @icatalyst/react
> Opinionated Library for rapid application development

This library is intended to allow focus on the primary purpose of an application and let the library take care of all of the secondary tasks.

This library makes heavy use of Singularity to offload identity and responsibility related tasks such as RBAC.

## Installation


## Developing

Install all dependencies
```bash
$ yarn install
```

View the project graph
```bash
$ npx nx graph
```

```
# Start storybook
$ yarn storybook
```



## Contributing

# TODO UPDATE DOCEMENTATION FROM HERE





## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)

