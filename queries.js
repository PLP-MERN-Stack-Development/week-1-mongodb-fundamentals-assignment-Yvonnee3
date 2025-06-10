//use plp_bookstore

// BASIC CRUD
db.books.find({ genre: "Classic" })
db.books.find({ published_year: { $gt: 2000 } })
db.books.find({ author: "George Orwell" })
db.books.updateOne({ title: "1984" }, { $set: { price: 11.99 } })
db.books.deleteOne({ title: "The Catcher in the Rye" })

// ADVANCED QUERIES
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
db.books.find().sort({ price: 1 })     
db.books.find().sort({ price: -1 })    
db.books.find().limit(5)               
db.books.find().skip(5).limit(5)       

// AGGREGATION
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])


// INDEXING
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: -1 })
db.books.find({ title: "Dune" }).explain("executionStats")
