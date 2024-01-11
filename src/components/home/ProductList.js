import React, { useEffect, useState } from "react";

import ItemCard from "../ItemCard";
import { Typography, Tabs, Tab, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { useQuery, gql } from "@apollo/client";

const GET_ITEMS = gql`
  query GetItems {
    items {
      data {
        attributes {
          name
          price
          shortDescription
          longDescription
          image {
            data {
              attributes {
                formats # Querying the whole JSON object
              }
            }
          }
        }
      }
    }
  }
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const { loading, error, data } = useQuery(GET_ITEMS);
  //change for tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // async function getItems() {
  //   const items = await fetch(
  //     "http://localhost:1337/api/items?populate=image",
  //     { method: "GET" }
  //   );
  //   const itemsJson = await items.json();
  //   dispatch(setItems(itemsJson.data));
  // }

  useEffect(() => {
    // getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );
  console.log(items);
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <ItemCard item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <ItemCard item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <ItemCard item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <ItemCard item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};
export default ProductList;
