import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/app/state/api"
import DashboardBox from "../DashboardBox"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import BoxHeader from "../BoxHeader"
import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "../FlexBetween"
import { Cell, Pie, PieChart } from "recharts"
import { useEffect, useState } from "react"

const RowThree = () => {
    const {data: kpiData} = useGetKpisQuery()
    const {data: transData} = useGetTransactionsQuery()
    interface DataItem {
      name: string;
      value: number; // Update the type of 'value' as per your data type
    }
    const {data: productData} = useGetProductsQuery()
    const [datas, setDatas] = useState<Array<DataItem>[]>([])
    const {palette} = useTheme()
    const pieColors = [palette.primary[800], palette.primary[500]];
    // console.log(transData)
    // console.log(data)

    const productColumns = [
        {
          field: "id",
          headerName: "id",
          flex: 1,
        },
        {
          field: "expense",
          headerName: "Expense",
          flex: 0.5,
          renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
          field: "price",
          headerName: "Price",
          flex: 0.5,
          renderCell: (params: GridCellParams) => `$${params.value}`,
        },
      ];

      const transactionColumns = [
        {
          field: "id",
          headerName: "id",
          flex: 1,
        },
        {
          field: "buyer",
          headerName: "Buyer",
          flex: 0.67,
        },
        {
          field: "amount",
          headerName: "Amount",
          flex: 0.35,
          renderCell: (params: GridCellParams) => `$${params.value}`,
        },
      ];

      useEffect(() => {
        if(kpiData) {
          const totalExpenses = kpiData.data[0].totalExpense
          const total = kpiData.data[0].expensesByCategory
         const totalToArray =  total[0]
        Object.entries(totalToArray).map(([key, value]) => {
          setDatas(prevData => [
            ...prevData,
           [{
              name: key,
              value: value as number, // Assuming value is a number, adjust the type as per your data type
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value as number,
            }],
          ]);

 
        });
      }}, [kpiData])
// id 444f1ba7-4db6-4aa2-b91e-30cb00151939
// Row3.tsx:63 currency USD
// Row3.tsx:63 salary 8000
// Row3.tsx:63 supplies 13000
// Row3.tsx:63 service 10000
// Row3.tsx:63 kpiId 34b0c195-5cc4-4a32-8101-81bd83de4bbc

      // useEffect(() => {
      //   if (kpiData) {
      //     const totalExpenses = kpiData[0].totalExpenses;
      //     Object.entries(kpiData[0].expensesByCategory).map(
      //       ([key, value]) => {
      //         return [
      //           {
      //             name: key,
      //             value: value,
      //           },
      //           {
      //             name: `${key} of Total`,
      //             value: totalExpenses - value,
      //           },
      //         ];
      //       }
      //     );
      //   }
      // }, [kpiData]);

      if(datas){
        console.log(datas)
      }


      
    return (
        <>
        <DashboardBox  gridArea="g">
        <BoxHeader 
          title="List of Products"
          sideText={`${productData?.data.length} products`}/>

         <Box
         mt="0.5rem"
         p="0 0.5rem"
         height="75%"
         sx={{
           "& .MuiDataGrid-root": {
             color: palette.grey[300],
             border: "none",
           },
           "& .MuiDataGrid-cell": {
             borderBottom: `1px solid ${palette.grey[800]} !important`,
           },
           "& .MuiDataGrid-columnHeaders": {
             borderBottom: `1px solid ${palette.grey[800]} !important`,
           },
           "& .MuiDataGrid-columnSeparator": {
             visibility: "hidden",
           },
         }}>

            <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData?.data || []}
            columns={productColumns}
          />
        </Box> 
        </DashboardBox>


        <DashboardBox  gridArea="h">
        <BoxHeader 
          title="List of Transactions"
          sideText={`${transData?.data.length} products`}/>

         <Box
         mt="0.5rem"
         p="0 0.5rem"
         height="75%"
         sx={{
           "& .MuiDataGrid-root": {
             color: palette.grey[300],
             border: "none",
           },
           "& .MuiDataGrid-cell": {
             borderBottom: `1px solid ${palette.grey[800]} !important`,
           },
           "& .MuiDataGrid-columnHeaders": {
             borderBottom: `1px solid ${palette.grey[800]} !important`,
           },
           "& .MuiDataGrid-columnSeparator": {
             visibility: "hidden",
           },
         }}>

            <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transData?.data || []}
            columns={transactionColumns}
          />
        </Box> 
        </DashboardBox>
        <DashboardBox  gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
        {datas?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={80}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
        </DashboardBox>
        <DashboardBox  gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
        </DashboardBox>
        </>
    )
}

export default RowThree