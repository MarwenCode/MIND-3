import { DataBase } from "../connect.js";

//create a category

export const createCategory = (req, res) => {
    const category = "INSERT INTO categories (`id`, `name`,`created_at`) VALUES (?) ";

    const values = [req.body.id, req.body.name, req.body.created_at]
    DataBase.query(category, [values], (error, data) => {
        if (error) return res.status(500).json(error);
      if (data) return res.status(200).json({ message: "Category created", data: data });;

    })


}


//get all categories

export const getAllCategries = (req, res) => {
    const sql = "SELECT * FROM categories";
    DataBase.query(sql, (error, data) => {
        if (error) {
            console.log(error)
            return res.json({error: error.message})
        }
        return res.json(data)
    })
  }


  //delete category 
  export const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    console.log("Deleting category with id:", categoryId);
  
    const query = "DELETE FROM categories WHERE id = ?";
  
    DataBase.query(query, [categoryId], (error, data) => {
      if (error) {
        res.json(error);
      } else {
        res.status(200).json("Category deleted ");
        console.log("Category deleted successfully");
      }
    });
  };

