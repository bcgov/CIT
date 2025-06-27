# Importing data into PowerBI

Importing data into powerbi happens in the Power Query Editor. To access this, Go to the [Home] tab at the top of 
the screen, and select [Transform data] in the ribbon under the subsection [Queries].

Along the left you have your current queries. It is likely that they have some specific code in them to handle 
pagination, delays, or custom column edits. Copy out the majority of a previous queries code by selecting the query, 
and then selecting [Advanced Editor] from the [Home] ribbon under the [Query] subsection.

Here is an example query:

```
let
    BaseUrl = "https://communityinformationtool.gov.bc.ca/api/pipeline/locations/?format=json",
    LimitPerPage = 1000,

    GetPage = (Index) =>
        let Offset  = "offset=" & Text.From(Index * LimitPerPage),
            Limit   = "limit=" & Text.From(LimitPerPage),
            Url   = BaseUrl & "&" & Limit & "&" & Offset,
            Json  = Function.InvokeAfter(() => Json.Document(Web.Contents(Url)), #duration(0,0,0,1)),
            Value = Json[results]
        in  Value,

    FirstPage = Json.Document(Web.Contents(BaseUrl & "&limit=" & Text.From(LimitPerPage))),
    EntityCount = FirstPage[count],
    PageCount   = Number.RoundUp(EntityCount / LimitPerPage),
    PageIndices = { 0 .. PageCount - 1 },
    Pages       = List.Transform(PageIndices, each GetPage(_)),
    #"Converted to Table" = Table.FromList(Pages, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandListColumn(#"Converted to Table", "Column1"),
    #"Expanded Column2" = Table.ExpandRecordColumn(#"Expanded Column1", "Column1", {"id", "name", "community_id", 
    #"location_type", "get_latitude", "get_longitude", "location_fuzzy"}, {"id", "name", "community_id", 
    #"location_type", "get_latitude", "get_longitude", "location_fuzzy"})
in
    #"Expanded Column2"
```

The important features of this query are the BaseUrl, LimitPerPage, and the last Expanded column.

The BaseUrl points to the API endpoint you have set up previously. It should also have `?format=json` at the end.

The LimitPerPage should be left at 1000 unless the dataset is very large per entry and needs to be lowered.

The last Expanded column is specific to the api endpoint and will describe all of the columns that will be retrieved. 
 This line needs to be edited to conform to the data that is available from the API.

If you need a way to update a large number of columns, an easy trick is:
- delete this Expanded Column 2 line
- remove the ',' from the Expanded Column 1 line so the syntax is correct
- change the very last line to Expanded Column 1.

Now you can press Done and the query preview will show one column. You can select the small icon in the 
top right of the table, To the right of 'Column1' in the row header. This icon will ask you which columns you would 
like to expand. The default is that all columns are selected (this is what you want). Also be sure to uncheck the 
'Use original column name as prefix' as this will make everything `Column1.id, Column1.name, etc.`
instead of `id, name, etc`.

Select OK and this query is done.

Repeat for any other api endpoints you need.
