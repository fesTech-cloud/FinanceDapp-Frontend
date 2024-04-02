import {useGetProductsQuery, useGetKpisQuery } from "@/app/state/api"
import DashboardBox from "../DashboardBox"
import { useEffect, useState } from "react"
import BoxHeader from "../BoxHeader"
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts"
import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "../FlexBetween"

const RowTwo = () => {

    const {data: productCost} = useGetProductsQuery()
    const {data: operationalCost} = useGetKpisQuery()
    const { palette } = useTheme()

    const [products, setProducts] = useState([])
    const [operational, setOperation] = useState([])

    const pieData = [
        { name: "Group A", value: 600 },
        { name: "Group B", value: 400 },
      ];

      const pieColors = [palette.primary[800], palette.primary[300]];
      
    useEffect(() => {
       if (productCost && operationalCost) {
          const monthlyOperationCost = operationalCost.data[0].monthlyData.map(({ month, nonOperationalExpenses
            , operationalExpenses
        }) => ({
             name: month.substring(0, 3),
             "operationalCost": operationalExpenses,
             "nonOperationalExpenses": nonOperationalExpenses
          }))
        //   console.log(productCost)
          const productCosts = productCost.data.map((data: any) => ({
            "expenses": data.expense,
            "price": data.price
          }))
          setOperation(monthlyOperationCost)
          setProducts(productCosts)
          console.log(products)
       }}, [productCost, operationalCost])
    return (
        <>
        <DashboardBox  gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            width={500}
            height={400}
            data={operational}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="operationalCost"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="nonOperationalExpenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>

        </DashboardBox>

                {/* ROW TWO */}
        <DashboardBox  gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
        </DashboardBox>


        <DashboardBox  gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expenses"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={products}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
        </DashboardBox>
        </>
    )
}

export default RowTwo