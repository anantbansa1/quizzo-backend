# Backend

Backend server for the Pinegap dashboard

## Dependencies

```
$ node -v
> v22.9.0
$ npm -v
> 10.8.3
```

## Setting up the repository

```
$ npm ci
```

## Running the server

Run the server using -

```
$ npm run dev
```

Verify the server is running by -

```
$ curl http://localhost:4000/health
> {"message":"Health check successful","data":"OK"}
```
