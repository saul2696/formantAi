function guardarMantenimiento() {
  const mantenimiento = {
    usuario: document.getElementById('usuario').value,
    area: document.getElementById('area').value,
    marca: document.getElementById('marca').value,
    serie: document.getElementById('serie').value,
    inventario: document.getElementById('inventario').value,
    fecha: document.getElementById('fecha').value,
    tipo: document.getElementById('tipo').value,
    observaciones1: document.getElementById('observaciones1').value,
    os_actualizado: document.getElementById('os_actualizado').value,
    observaciones2: document.getElementById('observaciones2').value,
    nomenclatura: document.getElementById('nomenclatura').value,
    observaciones3: document.getElementById('observaciones3').value,
    observaciones4: document.getElementById('observaciones4').value,
    observaciones5: document.getElementById('observaciones5').value,
    recomendaciones: document.getElementById('recomendaciones').value,
    tecnico: document.getElementById('tecnico').value
  };

  let registros = JSON.parse(localStorage.getItem('mantenimientos')) || [];
  registros.push(mantenimiento);
  localStorage.setItem('mantenimientos', JSON.stringify(registros));
  alert('Mantenimiento guardado exitosamente');
  document.getElementById('formulario').reset();
}

function mostrarHistorial() {
  const historial = document.getElementById('historial');
  historial.innerHTML = '';
  let registros = JSON.parse(localStorage.getItem('mantenimientos')) || [];

  registros.forEach((m, index) => {
    const div = document.createElement('div');
    div.className = 'registro mb-3 p-3 border rounded';
    div.innerHTML = `
      <strong>Mantenimiento #${index + 1}</strong><br>
      Usuario: ${m.usuario} | Área: ${m.area} | Fecha: ${m.fecha}<br>
      Tipo: ${m.tipo}<br>
      Observaciones Generales: ${m.observaciones1}<br>
      Técnico: ${m.tecnico}<br>
    `;
    historial.appendChild(div);
  });
}

function descargarExcel() {
  let registros = JSON.parse(localStorage.getItem('mantenimientos')) || [];
  if (registros.length === 0) {
    alert('No hay registros para exportar.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(registros);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mantenimientos");

  XLSX.writeFile(workbook, "Mantenimientos_AYTO.xlsx");
}
