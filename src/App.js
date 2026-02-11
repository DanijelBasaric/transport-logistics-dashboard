import React, { useState } from "react";
import { Container, Typography, Tabs, Tab, Box, Paper } from "@mui/material";
import Vozaci from "./Vozaci";
// import Vozila from './Vozila'; // Ovo ćemo otkomentarisati kad napravimo fajl

function App() {
    // Postavljamo tabIndex na 0 za "Početnu" stranu
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: "12px", minHeight: "60vh" }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        color: "#1976d2",
                        textAlign: "center",
                    }}
                >
                    🚚 Transport Logistics System
                </Typography>

                <Tabs
                    value={tabIndex}
                    onChange={(e, newVal) => setTabIndex(newVal)}
                    centered
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
                >
                    <Tab label="Početna" sx={{ textTransform: "none" }} />
                    <Tab label="Vozači" sx={{ textTransform: "none" }} />
                    <Tab label="Vozila" sx={{ textTransform: "none" }} />
                </Tabs>

                <Box sx={{ p: 2 }}>
                    {/* TAB 0: BLANKO / POČETNA */}
                    {tabIndex === 0 && (
                        <Box sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
                            <Typography variant="h5">
                                Dobrodošli u kontrolni centar
                            </Typography>
                            <Typography>
                                Izaberite opciju iz menija iznad za rad sa
                                podacima.
                            </Typography>
                        </Box>
                    )}

                    {/* TAB 1: VOZAČI */}
                    {tabIndex === 1 && <Vozaci />}

                    {/* TAB 2: VOZILA */}
                    {tabIndex === 2 && (
                        <Typography align="center" sx={{ mt: 5 }}>
                            Modul za vozila je u fazi izrade.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
