# Naming Conventions

## Different cases available
- camelCase
- PascalCase
- snake_case
- kebab-case

## Naming functions

- use camelCase
- use a verb descriptive of the action of that function as a prefix
- use a noun as a sufix
    - example: **listTables** or **addUser**


**For example: getName()** 

## Naming variables
- use camelCase 
- make the name descriptive of the stored value (avoid the need for commentary or extra context)
- **for booleans** use a prefix 
    - example: ***is*True** or ***has*Feathers**
- **for variables storing arrays** use a plural name
    - example: **user*s*** or **table*s***

### Exceptions
- variables storing sql statements
    - use snake_case
    - use a descriptive sql keyword as prefix
    - use a noun as sufix
        - example: select_users
- 'type' property for reduce
    - use snake_case but capitalised
        - example: CHANGE_TITLE

## Naming JSX Components
- use PascalCase
    - example: <ParentNode/>

## Naming Environment Variables
- SCREAM
    - example: **PORT**
