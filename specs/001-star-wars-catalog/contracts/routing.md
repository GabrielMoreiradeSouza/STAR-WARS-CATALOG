# Routing Contract

## Route Definitions

| Path | Page Component | Description |
|------|---------------|-------------|
| `/` | `HomePage` | Category selection grid |
| `/:category` | `CategoryPage` | List items with search/filters |
| `/:category/:id` | `DetailPage` | Item detail with resolved relationships |

**Category slug → API mapping**:

| Route Slug | API Category |
|------------|-------------|
| `people` | `people` |
| `films` | `films` |
| `planets` | `planets` |
| `starships` | `starships` |
| `vehicles` | `vehicles` |
| `species` | `species` |

## Navigation Behavior

- All navigation is client-side (no full page reloads)
- Browser back/forward navigates through visited items
- Invalid category slugs redirect to 404 or homepage
- Invalid IDs within a valid category show error state with link back to category list
