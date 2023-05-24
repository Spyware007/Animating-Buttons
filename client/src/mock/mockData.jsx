export const recentOrdersData = [
    {
        imageURL:"https://it-s.com/wp-content/webp-express/webp-images/uploads/2020/06/Database.png.webp",
        project:"Database Development",
        date:"Jan 21, 2021",
        total:"$1000"
    },
    {
        imageURL: "https://rvweb.nyc3.digitaloceanspaces.com/wp-content/uploads/2020/02/16121150/unity-1-1024x501.jpg",
        project:"Game Development",
        date:"Apr 30, 2021",
        total:"$800"
    },
    
    {
        imageURL:"https://www.artella.com/wp-content/uploads/2017/10/Modeling.jpg",
        project:"3D Modeling",
        date:"Jun 10, 2021",
        total:"$1200"
    }
]

export const recentProjectsData = [
    {
        thumbnail:"",
        project:"Complete 2023 React Js Crash Course",
        date:"Jan 21, 2021",
        price:"$1000"
    },
    {
        thumbnail:"",
        project:"React Expense Tracker using Hooks & Context API",
        date:"Apr 30, 2021",
        price:"$800"
    },
    
    {
        thumbnail:"https://i.ytimg.com/vi/0fYi8SGA20k/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWce0k5XmT0oYgy1xdoRsioH_u5A",
        project:"3D Website with Three.js",
        date:"Jun 10, 2021",
        price:"$1200"
    },
]

export const recentOrdersColumns = [
    {
        header:"Image",
        accessorKey:"imageURL",
        accessorFn: (rowData) => (
            <img src={rowData.imageURL} alt="imageURL" style={{ width: "150px", height: "50px",objectFit:"cover" }} ></img>
          ),
    },
    {
        header:"Project",
        accessorKey:"project",
    },
    {
        header:"Date",
        accessorKey:"date",
    },
    {
        header:"Total",
        accessorKey:"total",
    },
]

export const recentProjectsColumns = [
    {
        header:"Thumbnail",
        accessorKey:"thumbnail",
        accessorFn: (rowData) => (
            <img src={rowData.thumbnail} alt="Thumbnail" style={{ width: "100px", height: "50px",objectFit:"cover" }} ></img>
          ),
    },
    {
        header:"Project",
        accessorKey:"project",
    },
    {
        header:"Date",
        accessorKey:"date",
    },
    {
        header:"Price",
        accessorKey:"price",
    },
]