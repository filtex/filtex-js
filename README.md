# Filtex

The Filtex library is a versatile tool designed to filtering data across various sources like PostgreSQL, MongoDB, and in-memory datasets. This library empowers developers to create complex queries using both JSON and text formats, generating expressions compatible with the target data sources.

It allows to configure your dataset with some options and provides a metadata model to be able to use in UI components and then it accepts the query that is generated by UI and generates query for data sources like Postgres, Mongo etc.

Check the packages for other platforms.
- [filtex-go](https://github.com/filtex/filtex-go)
- [filtex-net](https://github.com/filtex/filtex-net)
- [filtex-ui](https://github.com/filtex/filtex-ui)


## Setup

```shell
npm install filtex-js
```

## Usage

#### Configure

```ts
import { Filtex, FieldOption, LookupOption, Lookup } from 'filtex-js';

// Create new filtex instance with options
const fx = Filtex.new(
    FieldOption.new().string().name("name").label("Name"),
    FieldOption.new().number().name("version").label("Version"),
    FieldOption.new().boolean().name("status").label("Status").lookup("statuses"),
    LookupOption.new().key("statuses").values([
        new Lookup("Enabled", true),
        new Lookup("Disabled", false),
    ]),
);
```

#### Metadata

```ts
// Get metadata model to render components
const metadata = fx.metadata();

console.log(metadata);
```

#### Expression From Text

```ts
// Generate expression from the text input
const expression = fx.expressionFromText("Name Contain Filtex And Status Equal Enabled");
```

#### Expression From JSON

```ts
// Generate expression from the json input
const expression = fx.expressionFromJson(`[
    "And",
    [
        ["Name", "Contain", "Filtex"],
        ["Status", "Equal", "Enabled"]
    ]
]`);
```

#### Validate From Text

```ts
// Validate from the text input
fx.validateFromText("Name Contain Filtex And Status Equal Enabled");
```

#### Validate From JSON

```ts
// Validate from the json input
fx.validateFromJson(`[
    "And",
    [
        ["Name", "Contain", "Filtex"],
        ["Status", "Equal", "Enabled"]
    ]
]`);
```

#### Mongo Filter

```ts
import { MongoFilterBuilder } from 'filtex-js/builders/mongo';

// Generate filter from the expression for mongo
const mongoFilter = new MongoFilterBuilder().build(expression);

console.log(mongoFilter);

// Use generated mongo filter
const result = mongoClient.getCollection("projects").find(mongoFilter.condition);

console.log(result);
```

#### Postgres Filter

```ts
import { PostgresFilterBuilder } from 'filtex-js/builders/postgres';

// Generate filter from the expression for postgres
const postgresFilter = new PostgresFilterBuilder().build(expression)

console.log(postgresFilter);

// Use generated postgres filter
const sql = "SELECT * FROM projects WHERE " + postgresFilter.condition;
const result = postgresClient.query(sql, postgresFilter.args);

console.log(result);
```

#### Memory Filter

```ts
import { MemoryFilterBuilder } from 'filtex-js/builders/memory';

// Generate filter from the expression for memory
const memoryFilter = new MemoryFilterBuilder().build(expression);

// Use generated memory function
const result = items.filter(memoryFilter.fn);

console.log(result);
```

## License
This library is licensed under the [MIT License](LICENSE).
