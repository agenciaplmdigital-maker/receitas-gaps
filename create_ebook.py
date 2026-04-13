from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib import colors
from datetime import datetime

# Define custom styles
styles = getSampleStyleSheet()

# Color scheme
olive = colors.HexColor("#556B2F")
beige = colors.HexColor("#F5F5DC")
sage = colors.HexColor("#9CAF88")
terracotta = colors.HexColor("#C24B3E")

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=28,
    textColor=olive,
    spaceAfter=30,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=16,
    textColor=olive,
    spaceAfter=12,
    spaceBefore=12,
    fontName='Helvetica-Bold'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontSize=11,
    alignment=TA_JUSTIFY,
    spaceAfter=12,
    leading=16
)

# Create PDF
pdf_path = "Protocolo_GAPS_EBook.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                        rightMargin=0.75*inch, leftMargin=0.75*inch,
                        topMargin=0.75*inch, bottomMargin=0.75*inch)

story = []

# CAPA
story.append(Spacer(1, 1.5*inch))
story.append(Paragraph("PROTOCOLO GAPS", title_style))
story.append(Paragraph("Guia Completo para Saude Intestinal",
                       ParagraphStyle('subtitle', parent=styles['Normal'],
                                    fontSize=16, textColor=sage,
                                    alignment=TA_CENTER, spaceAfter=30)))
story.append(Spacer(1, 1*inch))
story.append(Paragraph("Healing Your Gut, Healing Your Mind",
                       ParagraphStyle('subtitle2', parent=styles['Normal'],
                                    fontSize=12, textColor=terracotta,
                                    alignment=TA_CENTER, spaceAfter=50,
                                    fontName='Helvetica-Oblique')))
story.append(Spacer(1, 1.5*inch))
footer_text = f"2024 - Receitas GAPS Planejador de Refeicoes {datetime.now().strftime('%B %Y')}"
story.append(Paragraph(footer_text,
                       ParagraphStyle('footer', parent=styles['Normal'],
                                    fontSize=10, textColor=colors.grey,
                                    alignment=TA_CENTER)))

story.append(PageBreak())

# INDICE
story.append(Paragraph("INDICE", heading_style))
story.append(Spacer(1, 0.2*inch))
toc_items = [
    "1. O que eh GAPS?",
    "2. Por que GAPS funciona",
    "3. As Fases do Protocolo",
    "4. Alimentos Permitidos e Proibidos",
    "5. Beneficios do Protocolo GAPS",
    "6. Dicas Importantes",
    "7. Receitas Essenciais",
    "8. Proximos Passos"
]
for item in toc_items:
    story.append(Paragraph(item, body_style))
    story.append(Spacer(1, 0.1*inch))

story.append(PageBreak())

# SECAO 1
story.append(Paragraph("1. O QUE EH GAPS?", heading_style))
story.append(Paragraph(
    "GAPS significa Gut and Psychology Syndrome (Sindrome do Intestino e Psicologia). "
    "Eh um protocolo alimentar desenvolvido pela Dra. Natasha Campbell-McBride, baseado na ideia de que "
    "um intestino saudavel eh fundamental para a saude mental, imunologica e geral.",
    body_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Os Tres Pilares do GAPS:", heading_style))
story.append(Spacer(1, 0.1*inch))
pillar_data = [
    ["NUTRIÇÃO", "Alimentos ricos em aminoacidos e nutrientes"],
    ["MICROBIOTA", "Restaurar bacterias beneficas"],
    ["DIGESTÃO", "Caldos de osso e alimentos faceis de digerir"]
]
t = Table(pillar_data, colWidths=[1.5*inch, 3.5*inch])
t.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('TEXTCOLOR', (0, 0), (-1, 0), olive),
    ('ROWBACKGROUNDS', (0, 0), (-1, -1), [beige, colors.white]),
]))
story.append(t)

story.append(PageBreak())

# SECAO 2
story.append(Paragraph("2. POR QUE GAPS FUNCIONA", heading_style))
story.append(Paragraph(
    "O Intestino Permeavel: Um intestino saudavel tem uma barreira que controla o que eh absorvido. "
    "Quando essa barreira fica permeavel (leaky gut), substancias indesejadas entram na corrente sanguinea, "
    "causando inflamacao cronica.",
    body_style))
story.append(Spacer(1, 0.15*inch))
story.append(Paragraph(
    "O Papel da Microbiota: Nossas bacterias intestinais produzem neurotransmissores que afetam o cerebro. "
    "Um desequilibrio (disbiose) contribui para problemas emocionais e neurologicos.",
    body_style))
story.append(Spacer(1, 0.15*inch))
story.append(Paragraph(
    "A Solucao GAPS: Ao remover alimentos inflamatorios e adicionar nutrientes curativos, o intestino se recupera. "
    "As bacterias beneficas se reestabelecem, a inflamacao diminui e o corpo comeca a se curar.",
    body_style))

story.append(PageBreak())

# SECAO 3
story.append(Paragraph("3. AS FASES DO PROTOCOLO GAPS", heading_style))

phases = [
    ("FASE INTRODUCAO",
     "Duracao: 2-4 semanas ou mais. Fase mais restritiva para diminuir inflamacao e curar o intestino."),
    ("FULL GAPS",
     "Versao completa do protocolo com mais variedade de alimentos permitidos."),
    ("MANUTENCAO",
     "Reintroducao gradual e sustentavel de alimentos testados individualmente.")
]

for phase_name, phase_content in phases:
    story.append(Paragraph(f"{phase_name}",
                          ParagraphStyle('phase', parent=body_style,
                                       fontSize=12, textColor=olive, fontName='Helvetica-Bold')))
    story.append(Paragraph(phase_content, body_style))
    story.append(Spacer(1, 0.15*inch))

story.append(PageBreak())

# SECAO 4
story.append(Paragraph("4. ALIMENTOS PERMITIDOS E PROIBIDOS", heading_style))

story.append(Paragraph("SEMPRE PERMITIDO:",
                      ParagraphStyle('allowed', parent=body_style,
                                   fontSize=11, textColor=colors.green, fontName='Helvetica-Bold')))
allowed = "Ovos, Carne (vaca, frango, porco, cordeiro), Peixes, Caldos caseiros, Vegetais cozidos, Frutas, Ghee, Oleo de coco, Mel, Alimentos fermentados"
story.append(Paragraph(allowed, body_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("SEMPRE PROIBIDO:",
                      ParagraphStyle('forbidden', parent=body_style,
                                   fontSize=11, textColor=terracotta, fontName='Helvetica-Bold')))
forbidden = "Graos (trigo, aveia, arroz, milho), Acucar e doces processados, Oleos vegetais, Alimentos processados, Leguminosas (fase introducao), Laticinios pasteurizados, Aditivos"
story.append(Paragraph(forbidden, body_style))

story.append(PageBreak())

# SECAO 5
story.append(Paragraph("5. BENEFICIOS DO PROTOCOLO GAPS", heading_style))

benefits = [
    ("Saude Digestiva", "Reducao de inchaço, gases, constipacao e diarreia"),
    ("Clareza Mental", "Melhor foco, memoria e capacidade de concentracao"),
    ("Estabilidade Emocional", "Reducao de ansiedade, depressao e oscilacoes de humor"),
    ("Autoimmune", "Alivio de inflamacao e sintomas autoimunes"),
    ("Energia", "Aumento geral de energia e disposicao"),
    ("Pele", "Melhora de acne, eczema e outras condicoes de pele")
]

for benefit, description in benefits:
    story.append(Paragraph(f"{benefit}: {description}", body_style))

story.append(PageBreak())

# SECAO 6
story.append(Paragraph("6. DICAS IMPORTANTES", heading_style))

tips = [
    "Comece com caldo de osso: Beba uma xicara todos os dias.",
    "Mastigue bem: A digestao comeca na boca. Mastigue cada bocado 30+ vezes.",
    "Introduza devagar: Espere 3-5 dias entre cada alimento novo.",
    "Escute seu corpo: O protocolo eh um guia, nao uma regra rigida.",
    "Qualidade dos alimentos: Priorize organicos, sem pesticidas.",
    "Paciencia: A cura leva tempo (minimo 3-6 meses).",
    "Acompanhamento: Considere trabalhar com um profissional de saude.",
    "Suplementos: Podem ajudar mas nao sao essenciais."
]

for i, tip in enumerate(tips, 1):
    story.append(Paragraph(f"{i}. {tip}", body_style))

story.append(PageBreak())

# SECAO 7
story.append(Paragraph("7. RECEITAS ESSENCIAIS", heading_style))

recipes = [
    ("Caldo de Osso Basico",
     "Ingredientes: Ossos de carne, agua, sal, vinagre de maca. Modo: Cozinhe em fogo baixo por 24-48 horas. Coe e resfrie."),
    ("Sopa de Legumes com Caldo",
     "Ingredientes: Caldo de osso, cenoura, abobrra, beterraba, sal. Modo: Cozinhe vegetais no caldo ate ficarem macios."),
    ("Ovos Cozidos em Caldo",
     "Ingredientes: Ovos, caldo de osso quente. Modo: Cozinhe ovos no caldo em vez de agua.")
]

for recipe_name, recipe_content in recipes:
    story.append(Paragraph(recipe_name,
                          ParagraphStyle('recipe', parent=body_style,
                                       fontSize=11, textColor=olive, fontName='Helvetica-Bold')))
    story.append(Paragraph(recipe_content, body_style))
    story.append(Spacer(1, 0.15*inch))

story.append(PageBreak())

# SECAO 8
story.append(Paragraph("8. PROXIMOS PASSOS", heading_style))

story.append(Paragraph(
    "Comecando o GAPS: Consulte um profissional de saude, prepare caldo de osso caseiro, "
    "planeje suas refeicoes da fase Introducao, organize suas compras, seja consistente e paciente.",
    body_style))

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph(
    "Lembre-se: O GAPS nao eh uma dieta restritiva, eh uma ferramenta de cura. "
    "Com tempo e consistencia, voce vera melhorias significativas em sua saude.",
    ParagraphStyle('final', parent=body_style, fontSize=11,
                  textColor=sage, fontName='Helvetica-Oblique')))

story.append(Spacer(1, 0.5*inch))
story.append(Paragraph(
    "Receitas GAPS - Seu companheiro no caminho da saude intestinal",
    ParagraphStyle('contact', parent=styles['Normal'], fontSize=10,
                  alignment=TA_CENTER, textColor=olive, fontName='Helvetica-Bold')))

# Build PDF
doc.build(story)
print(f"E-book criado com sucesso!")
