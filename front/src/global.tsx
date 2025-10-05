export const Global = {

    ButtonStyle: {
        color: "#FFF",
        backgroundColor: '#005a58',
        padding: "20px"
    },

    Centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px"
    },

    CenteredNoMargin: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },

    Rows: {
        display: 'flex',
        flexDirection: 'row'
    },

    Columns: {
        display: 'flex',
        flexDirection: 'column'
    },

    CardWithBorderToSons: {

        '& > .MuiCard-root': {
            backgroundColor: '#ffffffff',
            border: "1px solid rgba(150, 150, 150, 1)",
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginLeft: "20px",
            marginRight: "20px"
        }
    },


    overlayColor: 'rgba(0, 0, 0, 0.7)',
    zIndexValue: 1000


}

