document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecetas');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const userData = {
        nombre: form.nombre.value,
        ingredientes: form.ingredientes.value,
        intrucciones: form.intrucciones.value,
        tiempo: form.tiempo.value,
        porciones: form.porciones.value,
        categoria: form.categoria.value,
        dificultad: form.dificultad.value
  
      };
  
      let userDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
      userDataList.push(userData);
      localStorage.setItem('userDataList', JSON.stringify(userDataList));
  
      alert('Datos guardados exitosamente!');
      form.reset();
    });
  });
  
  /*AREA DEL LISTAR Y EDITAR RECETAS*/
  
  document.addEventListener('DOMContentLoaded', () => {
    const recetasList = document.getElementById('userList'); 
    const clearAllBtn = document.getElementById('clearAll'); 
  
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const editnombre = document.getElementById('editnombre');
    const editingredientes = document.getElementById('editingredientes');
    const editintrucciones = document.getElementById('editintrucciones');
    const edittiempo = document.getElementById('edittiempo');
    const editporciones = document.getElementById('editporciones');
    const editcategoria = document.getElementById('editcategoria');
    const editdificultad = document.getElementById('editdificultad');
  
    const cancelEditBtn = document.getElementById('cancelEdit');
  
    let recetas = JSON.parse(localStorage.getItem('userDataList')) || [];
    let currentEditIndex = null;
  
    recetasGuardadas();
  
    function recetasGuardadas() {
      recetasList.innerHTML = '';
  
      if (recetas.length === 0) {
        recetasList.innerHTML = '<p>No hay recetas registradas.</p>'; 
      }
  
      recetas.forEach((recetaIngresada, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('receta-card');
        userDiv.innerHTML = `
          <p><strong>Nombre:</strong> ${recetaIngresada.nombre}</p>
          <p><strong>Ingredientes:</strong> ${recetaIngresada.ingredientes}</p>
          <p><strong>Intrucciones de preparación:</strong> ${recetaIngresada.intrucciones} cm</p>
          <p><strong>Tiempo de preparación.(min):</strong> ${recetaIngresada.tiempo}</p>
          <p><strong>Número de porciones:</strong> ${recetaIngresada.porciones}</p>
          <p><strong>Categorias:</strong> ${recetaIngresada.categoria}</p>
          <p><strong>Dificultad</strong> ${recetaIngresada.dificultad}</p>
  
          <button onclick="editUser(${index})" class="botones">Editar</button> <!-- Botón para editar -->
          <button onclick="deleteUser(${index})" class="botones">Eliminar</button> <!-- Botón para eliminar -->
          <hr>
      `;
        recetasList.appendChild(userDiv);
      });
    }
    function closeModal() {
      editModal.style.display = 'none'; 
      currentEditIndex = null; 
    }
    window.deleteUser = function (index) {
      if (confirm('¿Seguro que deseas eliminar esta receta?')) {
        recetas.splice(index, 1); 
        localStorage.setItem('userDataList', JSON.stringify(recetas)); 
        recetasGuardadas(); 
      }
    };
  
      window.editUser = function(index) {
        currentEditIndex = index; 
        const receta = recetas[index]; 
  
  
        editnombre.value = receta.nombre;
        editingredientes.value = receta.ingredientes;
        editintrucciones.value = receta.intrucciones;
        edittiempo.value = receta.tiempo;
        editporciones.value = receta.porciones;
        editcategoria.value = receta.categoria;
        editdificultad.value = receta.dificultad;
  
  
        editModal.style.display = 'block'; 
    };
  
  
    editForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      if (currentEditIndex !== null) {
  
        recetas[currentEditIndex].nombre = editnombre.value;
        recetas[currentEditIndex].ingredientes = editingredientes.value;
        recetas[currentEditIndex].intrucciones = editintrucciones.value;
        recetas[currentEditIndex].tiempo = edittiempo.value;
        recetas[currentEditIndex].porciones = editporciones.value;
        recetas[currentEditIndex].categoria = editcategoria.value;
        recetas[currentEditIndex].dificultad = editdificultad.value;
  
  
        localStorage.setItem('userDataList', JSON.stringify(recetas));
        alert('Datos guardados exitosamente!');
        recetasGuardadas(); 
        closeModal(); 
      }
    });
  
    cancelEditBtn.addEventListener('click', closeModal);
  
    clearAllBtn.addEventListener('click', () => {
      if (confirm('¿Seguro que deseas eliminar todas las recetas?')) {
        localStorage.removeItem('userDataList'); 
        users = []; 
        recetasGuardadas(); 
      }
    });
  });
  
  
  
  /*AREA DE FILTRADO*/
  const searchInput = document.getElementById("searchInput");
  
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase(); 
  
    const filtered = allMotorcycles.filter(moto =>
        `${moto.make} ${moto.model}`.toLowerCase().includes(term)
    );
  
    showMotorcycles(filtered);
  });