import {db} from '../index.js';

export const getEntregas = async (_, res) => {
    const q =`
    SELECT 
      e.ID_Entrega,
      e.Fecha_Despacho,
      e.Fecha_Entrega,
      e.Estado_Entrega,
      c.Nombre_Cliente,
      gt.NumeroGuia,
      p.Fecha_Pedido
    FROM Entregas e
    JOIN Pedidos p ON e.ID_Pedido = p.ID_Pedido
    JOIN Clientes c ON p.ID_Cliente = c.ID_Cliente
    JOIN GuiasTransporte gt ON e.ID_Guia_Transporte = gt.ID_Guia_Transporte
  `;
    try {
     const [rows] = await db.execute(q);
       res.status(200).json(rows);
    } catch (error) {
        console.error(error);
    }
};

export const getReports = async (_, res) => {
    const qEntregas =`
    SELECT
      COUNT(*) AS totalEntregas,
      SUM(CASE WHEN Estado_Entrega = 'Completada' THEN 1 ELSE 0 END) AS entregasCompletadas,
      SUM(CASE WHEN Estado_Entrega = 'Pendiente' THEN 1 ELSE 0 END) AS entregasPendientes,
      SUM(CASE WHEN Estado_Entrega = 'En Camino' THEN 1 ELSE 0 END) AS entregasEnCamino
    FROM Entregas
  `;

  const qPedidos = `
    SELECT
      COUNT(*) AS totalPedidos,
      SUM(CASE WHEN Estado_Pedido = 'Pendiente' THEN 1 ELSE 0 END) AS pedidosPendientes,
      SUM(CASE WHEN Estado_Pedido = 'Completado' THEN 1 ELSE 0 END) AS pedidosCompletados
    FROM Pedidos
  `;

    try {
     const [rowsE] = await db.execute(qEntregas);
     const [rowsP] = await db.execute(qPedidos);
     const estadisticas = {
        totalEntregas: rowsE[0].totalEntregas,
        entregasCompletadas: rowsE[0].entregasCompletadas,
        entregasPendientes: rowsE[0].entregasPendientes,
        entregasEnCamino: rowsE[0].entregasEnCamino,
        totalPedidos: rowsP[0].totalPedidos,
        pedidosPendientes: rowsP[0].pedidosPendientes,
        pedidosCompletados: rowsP[0].pedidosCompletados,
      };
      console.log(rowsE);
       res.status(200).json(estadisticas);
    } catch (error) {
        console.error(error);
    }
};