def analizar_css(css):
    texto_css = css
    if texto_css == '':
        return 'Digite alguma coisa'
    linha_css = texto_css.splitlines()
    Erros = ''

    def quebrar_por_palavra(linha):
        contador_linha_css = 0
        palavras = []
        while contador_linha_css<len(linha):
            palavra = linha[contador_linha_css].split()
            for i in palavra:
                palavras.append(i)  
            contador_linha_css += 1
        return palavras
    
    lista_palavras = quebrar_por_palavra(linha_css)

    def quebrar_por_letra(lista_palavras):
        contador_letra_css = 0
        letras = []
        while contador_letra_css<len(lista_palavras):
            letra = lista_palavras[contador_letra_css]
            for i in letra:
                letras.append(i)
            contador_letra_css += 1
        return letras

    lista_letras = quebrar_por_letra(lista_palavras)

    def pegar_selectors(texto):
        lista = texto.split('{')
        contador = 0
        lista_selectors = []
        lista_separada = []
        while contador<len(lista):
            lista_aux = lista[contador].split('}')
            lista_separada.extend(lista_aux)
            contador += 1

        i = 0
        while i<len(lista_separada):
            lista_selectors.append(lista_separada[i])
            i += 2 
            
        print(lista_selectors)
        return lista_selectors
 
    
    lista_selectors = pegar_selectors(texto_css)

    if lista_letras.count('{') > lista_letras.count('}'):
        Erros += 'Você esqueceu de colocar "}"\n'
    if lista_letras.count('{') < lista_letras.count('}'):
        Erros += 'Você esqueceu de colocar "{"\n'
    
    if Erros == '':
        return 'Não detectei nenhum erro'
        
    return Erros