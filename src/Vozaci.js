import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    TextField,
    InputAdornment,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TablePagination,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Vozaci() {
    const [vozaci, setVozaci] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        prezime_ime: "",
        jmbg: "",
        telefon: "",
    });

    useEffect(() => {
        fetchVozaci();
    }, []);

    async function fetchVozaci() {
        setLoading(true);
        const { data, error } = await supabase
            .from("vozaci")
            .select("*")
            .order("id", { ascending: true });
        if (!error) setVozaci(data);
        setLoading(false);
    }

    const handleSave = async () => {
        if (!formData.prezime_ime || formData.jmbg.length !== 13) {
            alert("Proverite Ime i JMBG (13 cifara)!");
            return;
        }
        if (editingId) {
            const { error } = await supabase
                .from("vozaci")
                .update(formData)
                .eq("id", editingId);
            if (!error) {
                setVozaci(
                    vozaci.map((v) =>
                        v.id === editingId ? { ...v, ...formData } : v,
                    ),
                );
                handleClose();
            }
        } else {
            const { data, error } = await supabase
                .from("vozaci")
                .insert([formData])
                .select();
            if (!error) {
                setVozaci([...vozaci, data[0]]);
                handleClose();
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Obrisati vozača?")) {
            const { error } = await supabase
                .from("vozaci")
                .delete()
                .eq("id", id);
            if (!error) setVozaci(vozaci.filter((v) => v.id !== id));
        }
    };

    const handleEditOpen = (vozac) => {
        setEditingId(vozac.id);
        setFormData({
            prezime_ime: vozac.prezime_ime,
            jmbg: vozac.jmbg,
            telefon: vozac.telefon,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        setFormData({ prezime_ime: "", jmbg: "", telefon: "" });
    };

    const filtrirani = vozaci.filter(
        (v) =>
            v.prezime_ime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.jmbg?.includes(searchTerm),
    );

    return (
        <Box>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
                <TextField
                    size="small"
                    placeholder="Pretraži vozače..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(0);
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{ textTransform: "none" }}
                >
                    Novi vozač
                </Button>
            </Box>

            {loading ? (
                <CircularProgress sx={{ display: "block", mx: "auto" }} />
            ) : (
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Prezime i Ime</TableCell>
                                <TableCell>JMBG</TableCell>
                                <TableCell>Telefon</TableCell>
                                <TableCell align="right">Akcije</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtrirani
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                )
                                .map((vozac) => (
                                    <TableRow key={vozac.id} hover>
                                        <TableCell>{vozac.id}</TableCell>
                                        <TableCell>
                                            {vozac.prezime_ime}
                                        </TableCell>
                                        <TableCell>{vozac.jmbg}</TableCell>
                                        <TableCell>{vozac.telefon}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() =>
                                                    handleEditOpen(vozac)
                                                }
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(vozac.id)
                                                }
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={filtrirani.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(e, p) => setPage(p)}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                    />
                </TableContainer>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingId ? "Izmena" : "Novi vozač"}</DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        pt: "20px !important",
                        width: "320px",
                    }}
                >
                    <TextField
                        label="Prezime i Ime"
                        fullWidth
                        size="small"
                        value={formData.prezime_ime}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                prezime_ime: e.target.value,
                            })
                        }
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        label="JMBG"
                        fullWidth
                        size="small"
                        value={formData.jmbg}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                jmbg: e.target.value.replace(/\D/g, ""),
                            })
                        }
                        slotProps={{
                            inputLabel: { shrink: true },
                            htmlInput: { maxLength: 13 },
                        }}
                        error={
                            formData.jmbg.length > 0 &&
                            formData.jmbg.length !== 13
                        }
                        helperText={
                            formData.jmbg.length > 0 &&
                            formData.jmbg.length !== 13
                                ? "Mora 13 cifara"
                                : ""
                        }
                    />
                    <TextField
                        label="Telefon"
                        fullWidth
                        size="small"
                        value={formData.telefon}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                telefon: e.target.value,
                            })
                        }
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{ textTransform: "none" }}
                    >
                        Otkaži
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{ textTransform: "none" }}
                    >
                        Sačuvaj
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Vozaci;
