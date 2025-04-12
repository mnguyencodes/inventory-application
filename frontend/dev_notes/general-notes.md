# General Notes

## tabler/icons-react Initial Load Issue

The code below resolves the issue with the library, tabler/icons-react, being loaded in full upon visiting the website.

Solution was found at:

https://stackoverflow.com/questions/79194970/tabler-icons-for-react-slowing-down-app-on-initial-load

```JavaScript
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
```
