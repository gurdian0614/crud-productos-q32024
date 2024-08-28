
import React, { useEffect, useState} from 'react'
import axios from 'axios'


const ShowProductos = () => {
    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState(1)

    const url = 'https://api.escuelajs.co/api/v1/products'

    /**
     * Obtiene listado de productos desde la API
     */
    const getProductos = async () => {
        const response = await axios.get(url);
        setProducts(response.data)
    }

    useEffect(() => { 
        getProductos()
    })

    /**
     * Abre el modal con los atributos del producto, si se va a editar, se cargan los datos
     * @param {Number} operation - 1. Agregar, 2. Editar 
     * @param {Number} id - Identificador del producto
     * @param {String} title - Nombre del producto
     * @param {String} description - Descripción del producto 
     * @param {Number} price - Precio del producto
     */
    const openModal = (operation, id, title, description, price) => {
        setId('')
        setTitle('')
        setDescription('')
        setPrice('')

        if (operation === 1) {
            setTitleModal('Registrar Producto')
            setOperation(1)
        } else if(operation === 2) {
            setTitleModal('Editar Producto')
            setOperation(2)
            setId(id)
            setTitle(title)
            setDescription(description)
            setPrice(price)
        }
    }

    return(
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalProductos">
                                <i className="fa-solid fa-circle-plus" /> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col*-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{i + 1}</td>
                                            <td>{product.title}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category.name}</td>
                                            <td>{product.price.toLocaleString('es-HN', { style: 'currency', currency: 'HNL' })}</td>
                                            <td>
                                                <button onClick={() => openModal(2, product.id, product.title, product.description, product.price) } className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductos' >
                                                    <i className='fa-solid fa-edit' />
                                                </button>
                                                <button className='btn btn-danger' >
                                                    <i className='fa-solid fa-trash' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id='modalProductos' className='modal fade' area-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titleModal}</label>
                            <button className='btn-close' data-bs-dismiss='modal' aria-label='close' />
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id' />
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                <input type='text' id='title' className='form-control' placeholder='Nombre' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment' /></span>
                                <input type='text' id='description' className='form-control' placeholder='Descripción' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='price' className='form-control' placeholder='Precio' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-success'>
                                <i className='fa solid fa-floppy-disk' /> Guardar
                            </button>
                            <button id='cerrarModal' className='btn btn-danger' data-bs-dismiss='modal' > Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProductos;