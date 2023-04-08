interface Exposed {
  readonly api: Readonly<typeof import('./src/api').api>
  readonly versions: Readonly<typeof import('./src/versions').versions>
}

// eslint-disable-next-line prettier/prettier, no-unused-vars
interface Window extends Exposed { }
