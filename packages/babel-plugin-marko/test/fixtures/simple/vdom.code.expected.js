{}
Hello
${input.name}
!
<if if=input.colors.length>
  <ul>
    <for(color) of=input.colors>
      <li>
        ${color}
      </li>
    </for>
  </ul>
</if>
<else>
  <div>
    No colors!
  </div>
</else>