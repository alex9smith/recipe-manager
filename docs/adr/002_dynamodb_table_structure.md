# 002 DynamoDB table structure

We'll need to store multiple types of itwm in DynamoDB - at least recipes and a representation of the calendar.

We'll use a single table design to store these items to minimise IO time and cost.
The advantages of this design are [well documented](https://aws.amazon.com/blogs/database/single-table-vs-multi-table-design-in-amazon-dynamodb/).

## Access patterns

We're designing to have two types of item in the table; recipes and calendars.

Both these objects can have a single ID attribute to uniqely identify them so we can use the item type in the composite primary key:

| Attribute name | Use           |
| -------------- | ------------- |
| item_type      | Partition key |
| id             | Sort key      |

We need CRUD operations on each type of object which are well supported with this primary key structure.

We also need to:

- Retrieve all recipes
- Retrive and update the latest calendar item
- Query for recipes with a certain tag

We can query with the recipe item type as the partition key to retrive all recipes.
We can use a 'special' item ID of `latest` to identify and query for the latest calendar item.
We can use a secondary index on recipe ID and tags to query recipes matching a tag.
