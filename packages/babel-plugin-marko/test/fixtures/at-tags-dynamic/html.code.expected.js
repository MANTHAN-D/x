{}
<hello>
  <@list>
    <for(color) of=input.colors>
      <if if=x>
        <@item style={
          color
        }>
          foo
        </@item>
      </if>
      <else>
        <@item style={
          color
        }>
          bar
        </@item>
      </else>
    </for>
  </@list>
  <for(col) of=input.table>
    <@col x=y>
      <for(row) of=col>
        <@row row=row>
          ${row}
        </@row>
      </for>
    </@col>
  </for>
  <@col outside>
    <@row row=-1>
      Outside
    </@row>
  </@col>
</hello>