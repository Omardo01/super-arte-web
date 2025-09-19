-- Habilitar Row Level Security
-- Ejecuta este código en el SQL Editor de Supabase

-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Crear tabla de cursos
CREATE TABLE cursos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  duracion TEXT NOT NULL,
  nivel TEXT NOT NULL DEFAULT 'principiante' CHECK (nivel IN ('principiante', 'intermedio', 'avanzado')),
  instructor TEXT NOT NULL,
  imagen_url TEXT,
  activo BOOLEAN DEFAULT true,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  max_participantes INTEGER DEFAULT 20,
  participantes_actuales INTEGER DEFAULT 0,
  categoria TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
-- Los usuarios solo pueden ver y editar su propio perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON usuarios
  FOR UPDATE USING (auth.uid() = id);

-- Los admins pueden ver todos los usuarios
CREATE POLICY "Los admins pueden ver todos los usuarios" ON usuarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin'
    )
  );

-- Políticas para cursos
-- Todos pueden ver cursos activos
CREATE POLICY "Todos pueden ver cursos activos" ON cursos
  FOR SELECT USING (activo = true);

-- Los admins pueden hacer todo con los cursos
CREATE POLICY "Los admins pueden gestionar cursos" ON cursos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin'
    )
  );

-- Función para crear usuario automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, nombre, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'usuario'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear usuario automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_cursos_updated_at
  BEFORE UPDATE ON cursos
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insertar algunos cursos de ejemplo
INSERT INTO cursos (titulo, descripcion, precio, duracion, nivel, instructor, categoria, fecha_inicio, fecha_fin) VALUES
('Pintura en Acuarela para Principiantes', 'Aprende las técnicas básicas de la acuarela, desde el manejo del pincel hasta la creación de degradados y texturas.', 1200.00, '8 semanas', 'principiante', 'María González', 'Pintura', '2024-02-01', '2024-03-30'),
('Técnicas Avanzadas de Óleo', 'Perfecciona tu técnica con óleo, aprende sobre capas, glazes y técnicas de los maestros clásicos.', 1800.00, '12 semanas', 'avanzado', 'Carlos Mendoza', 'Pintura', '2024-02-15', '2024-05-15'),
('Manualidades Creativas', 'Explora diferentes técnicas de manualidades: scrapbooking, decoupage, y decoración de objetos.', 800.00, '6 semanas', 'principiante', 'Ana Rodríguez', 'Manualidades', '2024-03-01', '2024-04-15'),
('Dibujo Artístico', 'Desarrolla tus habilidades de dibujo con técnicas de sombreado, perspectiva y composición.', 1000.00, '10 semanas', 'intermedio', 'Roberto Silva', 'Dibujo', '2024-02-20', '2024-05-01');
